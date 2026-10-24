#include <vector>
#include <climits>
#include <algorithm>

class Solution {
public:
    double findMedianSortedArrays(std::vector<int>& nums1, std::vector<int>& nums2) {
        if (nums1.size() > nums2.size()) return findMedianSortedArrays(nums2, nums1); // @viz swap
        int m = nums1.size(), n = nums2.size(); // @viz init
        int half = (m + n + 1) / 2; // @viz init
        int lo = 0, hi = m; // @viz init

        while (lo <= hi) {
            int i = lo + (hi - lo) / 2; // @viz cut
            int j = half - i; // @viz cut

            int L1 = (i > 0) ? nums1[i - 1] : INT_MIN; // @viz edges
            int R1 = (i < m) ? nums1[i] : INT_MAX; // @viz edges
            int L2 = (j > 0) ? nums2[j - 1] : INT_MIN; // @viz edges
            int R2 = (j < n) ? nums2[j] : INT_MAX; // @viz edges

            if (L1 > R2) { // @viz toomany
                hi = i - 1; // @viz toomany
            } else if (L2 > R1) { // @viz toofew
                lo = i + 1; // @viz toofew
            } else { // @viz found
                if ((m + n) % 2) return std::max(L1, L2); // @viz odd
                return (std::max(L1, L2) + (double)std::min(R1, R2)) / 2.0; // @viz even
            }
        }
        return 0.0; // unreachable for valid input
    }
};
