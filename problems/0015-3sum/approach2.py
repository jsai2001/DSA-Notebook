class Solution(object):
    def threeSum(self, nums):
        nums.sort()  # sorted, so each triplet comes out in the same order  # @viz init
        found = set()  # @viz init
        for i in range(len(nums)):  # @viz fix
            if i > 0 and nums[i] == nums[i - 1]:  # same first number: same triplets  # @viz skip
                continue  # @viz skip
            seen = set()  # values seen to the right of i so far  # @viz fix
            for j in range(i + 1, len(nums)):  # @viz scan
                need = -nums[i] - nums[j]  # Two Sum on the rest: what pairs with nums[j]?  # @viz need
                if need in seen:  # @viz check
                    found.add((nums[i], need, nums[j]))  # @viz found
                seen.add(nums[j])  # @viz store
        return [list(t) for t in found]  # @viz return
