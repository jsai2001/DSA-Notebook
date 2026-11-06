class Solution(object):
    def subsetsWithDup(self, nums):
        nums = sorted(nums)  # equal subsets now come out in the same order: [1,2] never [2,1]  # @viz init
        seen, path = set(), []  # @viz init
        def backtrack(i):  # decide nums[i], nums[i+1], ...  # @viz call
            if i == len(nums):  # @viz done
                seen.add(tuple(path))  # a set keeps one copy of each  # @viz done
                return  # @viz done
            path.append(nums[i])  # take nums[i]  # @viz take
            backtrack(i + 1)  # @viz take
            path.pop()  # leave it out  # @viz skip
            backtrack(i + 1)  # @viz skip
        backtrack(0)  # @viz init
        return [list(s) for s in seen]  # @viz return
