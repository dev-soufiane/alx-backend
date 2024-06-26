#!/usr/bin/python3
"""
MRU Caching
"""
from collections import OrderedDict
from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """MRUCache class for caching using MRU algorithm"""

    def __init__(self):
        """Initialize the MRUCache."""
        super().__init__()
        self.most_ru_order = OrderedDict()  # Order of most recently used items

    def put(self, key, item):
        """
        Assigns item value to key in cache using MRU.
        """
        if key is None or item is None:
            return

        self.cache_data[key] = item  # Assign item value to key in cache_data

        self.most_ru_order[key] = item  # Update order of recently used items

        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            # Discard the most recently used item from cache_data
            most_recently_item = next(iter(self.most_ru_order))
            del self.cache_data[most_recently_item]
            print(f"DISCARD: {most_recently_item}")

        if len(self.most_ru_order) > BaseCaching.MAX_ITEMS:
            # Remove the least recently used item from MRU order
            self.most_ru_order.popitem(last=False)

        # Move the current key to the front of most recently used order
        self.most_ru_order.move_to_end(key, last=False)

    def get(self, key):
        """Returns value associated with key in cache.

        Args:
            key: Key to retrieve value for.

        Returns:
            Value associated with the key,
            or None if the key is None or doesn't exist in the cache
        """
        if key is not None and key in self.cache_data:
            # Move the current key to the front of MRU order
            self.most_ru_order.move_to_end(key, last=False)
            return self.cache_data[key]
        return None
