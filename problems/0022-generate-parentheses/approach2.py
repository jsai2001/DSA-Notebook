class Solution(object):
    def generateParenthesis(self, n):
        result, path = [], []  # @viz init
        def backtrack(opened, closed):  # opened / closed: how many '(' and ')' are in path  # @viz call
            if len(path) == 2 * n:  # all n pairs placed  # @viz done
                result.append("".join(path))  # @viz done
                return  # @viz done
            if opened < n:  # an '(' is still left to place  # @viz open
                path.append("(")  # @viz open
                backtrack(opened + 1, closed)  # @viz open
                path.pop()  # undo, so ')' can be tried here  # @viz undo-open
            if closed < opened:  # ')' only when some '(' is still unmatched  # @viz close
                path.append(")")  # @viz close
                backtrack(opened, closed + 1)  # @viz close
                path.pop()  # @viz undo-close
        backtrack(0, 0)  # @viz start
        return result  # @viz return
