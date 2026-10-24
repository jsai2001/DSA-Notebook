#include <vector>

class Solution {
public:
    double findMedianSortedArrays(std::vector<int>& nums1, std::vector<int>& nums2) {
        int m = nums1.size(), n = nums2.size(); // @viz init
        int total = m + n; // @viz init
        int i = 0, j = 0, prev = 0, curr = 0; // @viz init
        for (int step = 0; step <= total / 2; ++step) { // @viz step
            prev = curr; // @viz step
            if (i < m && (j >= n || nums1[i] <= nums2[j])) curr = nums1[i++]; // @viz take1, take2
            else curr = nums2[j++]; // @viz take2
        }
        if (total % 2 == 0) return (prev + curr) / 2.0; // @viz even, odd
        return curr; // @viz odd
    }
};
