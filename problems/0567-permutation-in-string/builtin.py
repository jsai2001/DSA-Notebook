from collections import Counter
class Solution(object):
    def checkInclusion(self, s1, s2):
        m = len(s1)
        need, window = Counter(s1), Counter(s2[:m])
        for i in range(m, len(s2)):
            if window == need:
                return True
            window[s2[i]] += 1
            window[s2[i - m]] -= 1  # can leave a 0 behind; == ignores those (Python 3.10+)
        return window == need
