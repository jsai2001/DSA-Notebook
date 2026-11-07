class Solution(object):
    def checkValidString(self, s):
        def ok(i, open_):  # can s[i:] finish, with open_ "(" still waiting for a ")"?
            if open_ < 0:  # a ")" with nothing to close  # @viz dead
                return False  # @viz dead
            if i == len(s):  # @viz end
                return open_ == 0  # everything closed  # @viz end
            c = s[i]  # @viz try
            if c == "(":  # @viz try
                return ok(i + 1, open_ + 1)  # @viz try
            if c == ")":  # @viz try
                return ok(i + 1, open_ - 1)  # @viz try
            # "*": try all three meanings
            return ok(i + 1, open_ + 1) or ok(i + 1, open_ - 1) or ok(i + 1, open_)  # @viz star

        return ok(0, 0)  # @viz init
