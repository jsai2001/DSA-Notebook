class Solution(object):
    def isValid(self, s):
        if len(s) % 2:  # an odd length can't pair up  # @viz odd
            return False  # @viz odd
        pairs = {")": "(", "]": "[", "}": "{"}  # closer -> its opener  # @viz init
        stack = []  # openers still waiting for their closer  # @viz init
        for ch in s:  # @viz loop
            if ch in pairs:  # a closer must match the most recent open bracket  # @viz close
                if not stack or stack[-1] != pairs[ch]:  # @viz close
                    return False  # @viz mismatch
                stack.pop()  # @viz match
            else:
                stack.append(ch)  # an opener: wait for its closer  # @viz open
        return not stack  # anything still open means invalid  # @viz return
