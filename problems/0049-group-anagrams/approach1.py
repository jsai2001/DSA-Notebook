class Solution(object):
    def groupAnagrams(self, strs):
        groups = []  # each group: words that are anagrams of each other  # @viz init
        for s in strs:  # @viz word
            for group in groups:  # compare with one word from each group so far  # @viz compare
                if self.is_anagram(group[0], s):  # @viz compare
                    group.append(s)  # @viz join
                    break  # @viz join
            else:  # no group matched: s starts a new one  # @viz new
                groups.append([s])  # @viz new
        return groups  # @viz return

    def is_anagram(self, a, b):  # same letters, same number of times
        return len(a) == len(b) and sorted(a) == sorted(b)
