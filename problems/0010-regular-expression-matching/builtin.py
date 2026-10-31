import re


class Solution(object):
    def isMatch(self, s, p):
        # p only uses letters, '.' and '*', which mean the same in real regex.
        # \Z anchors the end, so the whole string must match (like re.fullmatch).
        return re.match("(?:" + p + r")\Z", s) is not None
