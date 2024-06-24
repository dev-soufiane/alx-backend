#!/usr/bin/env python3
"""
Simple pagination
"""
import csv
import math
from typing import List, Tuple


def index_range(page, page_size):
    """
    Calculates start and end indexes for pagination.

    Args:
        page (int): Page number.
        page_size (int): Rows per page.

    Returns:
        tuple: Start and end indexes.
    """
    start_idx = (page - 1) * page_size
    end_idx = start_idx + page_size
    return start_idx, end_idx  # Returns (start, end) indexes


class Server:
    """Server class to paginate a database of popular baby names."""
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset."""
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]  # Skip header row

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        Retrieves dataset page based on page number and size.

        Args:
            page (int, optional): Page number (1-indexed). Defaults to 1.
            page_size (int, optional): Size of each page. Defaults to 10.

        Returns:
            list: Rows from the dataset for the specified page.
        """
        # Validate page and page_size are positive integers
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0

        data_size = len(self.dataset())
        start_idx, end_idx = index_range(page, page_size)
        end_idx = min(end_idx, data_size)

        # Return empty list if start index is out of range
        if start_idx >= data_size:
            return []

        return self.dataset()[start_idx:end_idx]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> dict:
        """
        Retrieves hypermedia pagination information for a specific page.
        """
        # Calculate total number of pages
        total_pages = math.ceil(len(self.dataset()) / page_size)

        # Retrieve dataset page
        data = self.get_page(page, page_size)

        # Determine next and previous page numbers
        next_page = page + 1 if page < total_pages else None
        prev_page = page - 1 if page > 1 else None

        return {
            "page_size": page_size,
            "page": page,
            "data": data,
            "next_page": next_page,
            "prev_page": prev_page,
            "total_pages": total_pages
        }
