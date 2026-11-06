from functools import reduce
from operator import xor
class Solution(object):
    def singleNumber(self, nums):
        return reduce(xor, nums)  # the XOR of everything: pairs cancel
