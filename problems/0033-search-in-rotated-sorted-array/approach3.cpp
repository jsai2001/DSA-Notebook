#include <vector>
class Solution {
public:
    int search(std::vector<int>& nums, int target) {
        int lo = 0, hi = (int)nums.size() - 1; // @viz init
        while (lo <= hi) { // @viz loop
            int mid = lo + (hi - lo) / 2; // @viz loop
            if (nums[mid] == target) return mid; // @viz found
            // one of the two halves is always sorted; <= so that lo == mid counts as sorted
            if (nums[lo] <= nums[mid]) { // the left half lo..mid is sorted // @viz left-sorted
                if (nums[lo] <= target && target < nums[mid]) hi = mid - 1; // target fits inside it // @viz in-left
                else lo = mid + 1; // @viz not-left
            } else { // the right half mid..hi is sorted // @viz right-sorted
                if (nums[mid] < target && target <= nums[hi]) lo = mid + 1; // target fits inside it // @viz in-right
                else hi = mid - 1; // @viz not-right
            }
        }
        return -1; // @viz missing
    }
};
