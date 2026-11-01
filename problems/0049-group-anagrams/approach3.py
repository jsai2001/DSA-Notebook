class Solution(object):
    def groupAnagrams(self, strs):
        groups = {}  # letter counts -> the words that have them  # @viz init
        for s in strs:  # @viz word
            count = [0] * 26  # how many a's, b's, ..., z's  # @viz count
            for ch in s:  # @viz count
                count[ord(ch) - ord("a")] += 1  # @viz count
            key = tuple(count)  # a tuple can be a dict key; anagrams have equal counts  # @viz key
            groups.setdefault(key, []).append(s)  # @viz add
        return list(groups.values())  # @viz return
