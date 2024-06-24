#!/usr/bin/env python3
"""
Simple helper function
"""


def index_range(page, page_size):
    """
    Calculates start and end indexes for pagination.

    Args:
        page (int): Page number.
        page_size (int): Rows per page.

    Returns:
        tuple: Start and end indexes.
    """
    # Calculate start index based on page number and page size
    start_idx = (page - 1) * page_size

    # Calculate end index by adding start index to page size
    end_idx = start_idx + page_size

    # Return tuple with start and end indexes
    return start_idx, end_idx
