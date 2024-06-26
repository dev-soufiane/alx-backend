#!/usr/bin/python3
"""
LRU Caching
"""
from base_caching import BaseCaching


class LRUCache(BaseCaching):
    """LRUCache class for caching using LRU algorithm"""

    def __init__(self):
        """Initialize the LRUCache"""
        super().__init__()
        self.key_order = []  # List to manage order of key access

    def put(self, key, item):
        """
        Assigns item value to key in cache using LRU.
        """
        if key is not None and item is not None:
            self.cache_data[key] = item

            if len(self.cache_data) > BaseCaching.MAX_ITEMS:
                least_used_key = self.key_order.pop(0)
                del self.cache_data[least_used_key]
                print(f"DISCARD: {least_used_key}")

            if key in self.key_order:
                self.key_order.remove(key)
            self.key_order.append(key)

    def get(self, key):
        """
        Returns value associated with key in cache.
        """
        if key is not None and key in self.cache_data:
            self.key_order.remove(key)
            self.key_order.append(key)
            return self.cache_data[key]
        return None
