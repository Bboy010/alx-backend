#!/usr/bin/python3
""" LFU Caching """
BaseCaching = __import__('base_caching').BaseCaching


class LFUCache(BaseCaching):
    """ LFU caching """

    def __init__(self):
        """ Initialize """
        super().__init__()
        self.frequency = {}
        self.access_time = {}
        self.time = 0

    def update_access_time(self, key):
        """ Update access time for a key """
        self.access_time[key] = self.time
        self.time += 1

    def remove_least_frequent(self):
        """ Remove least frequently used item """
        min_frequency = min(self.frequency.values())
        lfu_keys = [key for key, freq in self.frequency.items() if freq == min_frequency]
        lru_key = min(lfu_keys, key=lambda key: self.access_time[key])

        self.cache_data.pop(lru_key)
        self.frequency.pop(lru_key)
        self.access_time.pop(lru_key)
        print("DISCARD:", lru_key)

    def put(self, key, item):
        """ Add an item to the cache """
        if key is None or item is None:
            return

        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            self.remove_least_frequent()

        self.cache_data[key] = item
        self.update_access_time(key)

        if key in self.frequency:
            self.frequency[key] += 1
        else:
            self.frequency[key] = 1

    def get(self, key):
        """ Get an item from cache """
        if key is None or key not in self.cache_data:
            return None

        self.update_access_time(key)
        self.frequency[key] += 1
        return self.cache_data[key]
