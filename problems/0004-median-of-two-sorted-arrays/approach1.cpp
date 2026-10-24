#include <vector>

class Solution {
public:
    double findMedianSortedArrays(std::vector<int>& nums1, std::vector<int>& nums2) {
        int m = nums1.size(), n = nums2.size(); // @viz setup
        std::vector<int> result; // @viz init
        result.reserve(m + n); // @viz init
        int i = 0, j = 0; // @viz init

        while (i < m && j < n) {
            if (nums1[i] <= nums2[j]) result.push_back(nums1[i++]); // @viz take1, takeboth
            else result.push_back(nums2[j++]); // @viz take2
        }
        while (i < m) result.push_back(nums1[i++]); // @viz rest
        while (j < n) result.push_back(nums2[j++]); // @viz rest

        int total = result.size(); // @viz median
        int mid = total / 2; // @viz median
        if (total % 2 == 0) { // @viz median
            return (result[mid - 1] + result[mid]) / 2.0; // @viz median
        }
        return result[mid]; // @viz median
    }
};
