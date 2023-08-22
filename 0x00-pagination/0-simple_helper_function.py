#!/usr/bin/env python3
"""Write a function named index_range
the funtion takes two integer arguments page and page_size.
Page numbers are 1-indexed, i.e. the first page is page 1.
"""


def index_range(page, page_size):
    """ return a tuple of size a start index and an end index """
    start = (page - 1) * page_size
    end = page * page_size
    return (start, end)
