class Solution(object):
    def mergeTriplets(self, triplets, target):
        x, y, z = target  # @viz init
        a = b = c = False  # found a safe triplet that hits target[0], [1], [2]  # @viz init
        for t in triplets:  # @viz scan
            if t[0] <= x and t[1] <= y and t[2] <= z:  # safe to merge  # @viz hit
                a, b, c = a or t[0] == x, b or t[1] == y, c or t[2] == z  # @viz hit
                if a and b and c:  # all three hit: merging those gives the target  # @viz return
                    return True  # @viz return
        return False  # @viz return
