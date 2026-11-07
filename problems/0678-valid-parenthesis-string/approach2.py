class Solution(object):
    def checkValidString(self, s):
        opens, stars = [], []  # indexes of unmatched "(" and of unused "*"  # @viz init
        for i, c in enumerate(s):  # @viz loop
            if c == "(":  # @viz open
                opens.append(i)  # @viz open
            elif c == "*":  # @viz star
                stars.append(i)  # @viz star
            elif opens:  # ")": match the nearest "(" first  # @viz close
                opens.pop()  # @viz close
            elif stars:  # no "(" left: use a "*" as "("  # @viz close
                stars.pop()  # @viz close
            else:  # @viz close
                return False  # @viz close
        # Each leftover "(" needs a "*" AFTER it to act as ")".
        while opens and stars:  # @viz pair
            if opens.pop() > stars.pop():  # the "*" comes first: it can't close this "("  # @viz pair
                return False  # @viz pair
        return not opens  # leftover "*" can just be empty  # @viz return
