#!/usr/bin/python3
""" MRUCache module
"""

from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """ MRUCache class
    """

    def __init__(self):
        """ Initialize the MRU cache
        """
        super().__init__()
        self.order = []
        """List to maintain the order
        of keys based on access time"""

    def put(self, key, item):
        """ Add an item in the cache using MRU strategy
        """
        if key is not None and item is not None:
            if len(self.cache_data) >= self.MAX_ITEMS:
                discarded_key = self.order.pop()
                del self.cache_data[discarded_key]
                print(f"DISCARD: {discarded_key}")

            self.cache_data[key] = item
            self.order.append(key)

    def get(self, key):
        """ Get an item by key from the cache
        """
        if key is None or key not in self.cache_data:
            return None
        """most recently used"""
        self.order.remove(key)
        self.order.append(key)

        return self.cache_data[key]
