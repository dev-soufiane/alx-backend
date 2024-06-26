#!/usr/bin/env python3
"""
Basic dictionary
"""
from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """BasicCache class for a caching system."""

    def put(self, key, item):
        """Assigns item value to key in cache.

        Args:
            key: Key to assign item value to.
            item: Value to be assigned to key.
        """
        if key is not None and item is not None:
            self.cache_data[key] = item

    def get(self, key):
        """Returns value associated with key in cache.

        Args:
            key: Key to retrieve value for.

        Returns:
            Value associated with key, or None if key is None / doesn't exist.
        """
        if key is not None and key in self.cache_data:
            return self.cache_data[key]
        return None
