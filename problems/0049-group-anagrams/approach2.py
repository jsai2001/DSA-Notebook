class Solution(object):
    def groupAnagrams(self, strs):
        groups = {}  # sorted letters -> the words that have them  # @viz init
        for s in strs:  # @viz word
            key = "".join(sorted(s))  # anagrams sort to the same string: "eat", "tea" -> "aet"  # @viz key
            groups.setdefault(key, []).append(s)  # @viz add
        return list(groups.values())  # @viz return
