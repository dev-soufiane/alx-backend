#!/usr/bin/python3
"""
LFU Caching
"""
from base_caching import BaseCaching


class LFUCache(BaseCaching):
    """
    LFUCache class for caching using LFU algorithm.
    """

    def __init__(self):
        """
        Initialize the LFUCache.
        """
        super().__init__()
        self.item_freqs = {}  # Tracks frequency of cache items

    def put(self, key, item):
        """Assigns item value to key in cache using LFU.

        Args:
            key: Key to assign item value to.
            item: Value to be assigned to the key.
        """
        if key is None or item is None:
            return

        self.cache_data[key] = item  # Assign item value to key in cache_data

        if len(self.cache_data) > self.MAX_ITEMS:
            item_to_discard = min(self.item_freqs, key=self.item_freqs.get)
            self.item_freqs.pop(item_to_discard)
            self.cache_data.pop(item_to_discard)
            print(f"DISCARD: {item_to_discard}")

        if key not in self.item_freqs:
            self.item_freqs[key] = 0  # Initialize frequency for a new item
        else:
            self.item_freqs[key] += 1  # Increment frequency of existing item

    def get(self, key):
        """Returns value associated with key in cache.

        Args:
            key: Key of the item to retrieve.

        Returns:
            Value associated with the key,
            or None if the key is None or doesn't exist in the cache.
        """
        if key is None or key not in self.cache_data:
            return None

        self.item_freqs[key] += 1  # Increment frequency of accessed item

        return self.cache_data.get(key)
