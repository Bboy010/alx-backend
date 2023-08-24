#!/usr/bin/python3
""" FIFOCache module
"""

from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """ FIFOCache class
    """

    def __init__(self):
        """ Initialize the FIFO cache
        """
        super().__init__()
        self.queue = []  # A queue to keep track of insertion order

    def put(self, key, item):
        """ Add an item in the cache using FIFO strategy
        """
        if key is not None and item is not None:
            if len(self.cache_data) >= self.MAX_ITEMS:
                discarded_key = self.queue.pop(0)
                del self.cache_data[discarded_key]
                print(f"DISCARD: {discarded_key}")

            self.cache_data[key] = item
            self.queue.append(key)

    def get(self, key):
        """ Get an item by key from the cache
        """
        if key is None or key not in self.cache_data:
            return None
        return self.cache_data[key]
