#!/usr/bin/python3
"""
FIFO caching
"""
from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """FIFOCache class for caching using FIFO algorithm"""

    def __init__(self):
        """Initializes the FIFOCache"""
        super().__init__()

    def put(self, key, item):
        """Assigns item value to key in cache using FIFO.

        Args:
            key: Key to assign item value to.
            item: Value to be assigned to the key.
        """
        if key is not None and item is not None:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                # Remove the first item (FIFO)
                first_key = next(iter(self.cache_data))
                del self.cache_data[first_key]
                print(f"DISCARD: {first_key}")

            self.cache_data[key] = item

    def get(self, key):
        """Returns value associated with key in cache.

        Args:
            key: Key to retrieve value for.

        Returns:
            Value associated with the key,
            or None if the key is None / doesn't exist in the cache
        """
        if key is not None and key in self.cache_data:
            return self.cache_data[key]
        return None
