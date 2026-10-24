#include <vector>

class Solution {
public:
    double findMedianSortedArrays(std::vector<int>& nums1, std::vector<int>& nums2) {
        int m = nums1.size(), n = nums2.size();
        int total = m + n;
        int i = 0, j = 0, prev = 0, curr = 0;
        for (int step = 0; step <= total / 2; ++step) {
            prev = curr;
            if (i < m && (j >= n || nums1[i] <= nums2[j])) curr = nums1[i++];
            else curr = nums2[j++];
        }
        if (total % 2 == 0) return (prev + curr) / 2.0;
        return curr;
    }
};
