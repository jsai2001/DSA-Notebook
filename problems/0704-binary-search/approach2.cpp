#include <vector>
class Solution {
public:
    int search(std::vector<int>& nums, int target) {
        return find(nums, target, 0, nums.size() - 1); // @viz call
    }
private:
    int find(const std::vector<int>& nums, int target, int lo, int hi) { // target's index within nums[lo..hi], or -1 // @viz call
        if (lo > hi) return -1; // nothing left to search // @viz none
        int mid = lo + (hi - lo) / 2; // @viz mid
        if (nums[mid] == target) return mid; // @viz found
        if (nums[mid] < target) return find(nums, target, mid + 1, hi); // target is bigger: it can only be on the right // @viz right
        return find(nums, target, lo, mid - 1); // smaller: only on the left // @viz left
    }
};
