#include <vector>
#include <algorithm>
#include <iterator>

class Solution {
public:
    double findMedianSortedArrays(std::vector<int>& nums1, std::vector<int>& nums2) {
        std::vector<int> all;
        // std::merge combines two sorted ranges in one linear pass.
        std::merge(nums1.begin(), nums1.end(), nums2.begin(), nums2.end(),
                   std::back_inserter(all));
        int mid = all.size() / 2;
        return all.size() % 2 ? all[mid] : (all[mid - 1] + all[mid]) / 2.0;
    }
};
