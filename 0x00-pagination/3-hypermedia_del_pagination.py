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
        # Validate index and page_size are positive integers
        assert isinstance(index, int) and index >= 0
        assert isinstance(page_size, int) and page_size > 0

        # Retrieve the indexed dataset
        dataset = self.indexed_dataset()

        # Verify that index is within valid range of the dataset
        assert index < len(dataset)

        # Initialize variables
        data = []
        next_index = index + page_size

        # Loop through the dataset to retrieve data for the page
        while len(data) < page_size and index < len(dataset):
            if index in dataset:
                data.append(dataset[index])
            index += 1

        return {
            "index": index - len(data),
            "next_index": index,  # Set next index for the next page request
            "page_size": page_size,
            "data": data
        }
