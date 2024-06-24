#!/usr/bin/env python3
"""
Deletion-resilient hypermedia pagination
"""

import csv
from typing import List, Dict


class Server:
    """Server class to paginate a database of popular baby names."""
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset."""
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]  # Skip header row

        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Dataset indexed by sorting position, starting at 0."""
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            truncated_dataset = dataset[:1000]
            self.__indexed_dataset =
            {i: dataset[i] for i in range(len(dataset))}

        return self.__indexed_dataset

    def get_hyper_index(self, index: int = None, page_size: int = 10) -> Dict:
        """
        Retrieves hyper-index from indexed dataset.
        """
        # Validate input types
        assert isinstance(index, int) and isinstance(page_size, int)

        # Ensure index is within valid range of the indexed dataset
        dataset = self.indexed_dataset()
        assert 0 <= index < len(dataset)

        data = []
        idx = index + page_size

        # Iterate over the range from index to idx
        for i in range(index, idx):
            if dataset.get(i):
                data.append(dataset[i])
            else:
                # Skip missing item and adjust idx accordingly
                i += 1
                idx += 1

        return {
            "data": data,
            "index": index,
            "next_index": idx,
            "page_size": page_size
        }
