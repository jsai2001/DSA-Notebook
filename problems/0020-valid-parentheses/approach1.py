class Solution(object):
    def isValid(self, s):
        while True:  # @viz loop
            # remove every adjacent matching pair: "()", then "[]", then "{}"
            shorter = s.replace("()", "").replace("[]", "").replace("{}", "")  # @viz remove
            if shorter == s:  # nothing left to remove  # @viz check
                break  # @viz check
            s = shorter  # @viz shrink
        return s == ""  # valid only if everything cancelled out  # @viz return
