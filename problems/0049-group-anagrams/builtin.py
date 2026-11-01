from itertools import groupby
class Solution(object):
    def groupAnagrams(self, strs):
        key = lambda s: "".join(sorted(s))
        # groupby only joins neighbours, so sort by the key first
        return [list(g) for _, g in groupby(sorted(strs, key=key), key=key)]
