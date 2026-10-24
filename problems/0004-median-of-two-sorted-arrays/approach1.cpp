#include <vector>

class Solution {
public:
    double findMedianSortedArrays(std::vector<int>& nums1, std::vector<int>& nums2) {
        int m = nums1.size(), n = nums2.size();
        std::vector<int> result;
        result.reserve(m + n);
        int i = 0, j = 0;

        while (i < m && j < n) {
            if (nums1[i] <= nums2[j]) result.push_back(nums1[i++]);
            else result.push_back(nums2[j++]);
        }
        while (i < m) result.push_back(nums1[i++]);
        while (j < n) result.push_back(nums2[j++]);

        int total = result.size();
        int mid = total / 2;
        if (total % 2 == 0) {
            return (result[mid - 1] + result[mid]) / 2.0;
        }
        return result[mid];
    }
};
