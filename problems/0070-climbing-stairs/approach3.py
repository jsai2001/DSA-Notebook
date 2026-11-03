class Solution(object):
    def climbStairs(self, n):
        # [[1, 1], [1, 0]] to the power n is [[ways(n), ways(n - 1)], [ways(n - 1), ways(n - 2)]]
        def mul(x, y):  # 2 x 2 matrix product  # @viz mul
            return [[x[0][0] * y[0][0] + x[0][1] * y[1][0], x[0][0] * y[0][1] + x[0][1] * y[1][1]],  # @viz mul
                    [x[1][0] * y[0][0] + x[1][1] * y[1][0], x[1][0] * y[0][1] + x[1][1] * y[1][1]]]  # @viz mul
        result = [[1, 0], [0, 1]]  # the identity: M to the power 0  # @viz init
        base = [[1, 1], [1, 0]]  # M to the power 1  # @viz init
        p = n  # @viz init
        while p:  # fast power: one bit of n per round  # @viz bit
            if p & 1:  # this bit is 1: multiply its power of M in  # @viz bit
                result = mul(result, base)  # @viz take
            base = mul(base, base)  # M^1, M^2, M^4, M^8, ...  # @viz square
            p >>= 1  # @viz square
        return result[0][0]  # @viz answer
