#include <algorithm>
#include <vector>
class Solution {
public:
    int search(std::vector<int>& nums, int target) {
        int lo = 0, hi = (int)nums.size() - 1;
        while (lo < hi) { // find where the rotation starts (the smallest value)
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] > nums[hi]) lo = mid + 1;
            else hi = mid;
        }
        // nums[0..lo-1] holds the values >= nums[0]; nums[lo..] holds the smaller ones
        auto first = nums.begin(), last = nums.end();
        if (lo > 0 && target >= nums[0]) last = nums.begin() + lo;
        else first = nums.begin() + lo;
        auto it = std::lower_bound(first, last, target); // the library's binary search on that part
        return it != last && *it == target ? (int)(it - nums.begin()) : -1;
    }
};
