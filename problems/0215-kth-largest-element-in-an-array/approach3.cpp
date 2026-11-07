#include <random>
#include <utility>
#include <vector>
class Solution {
public:
    int findKthLargest(std::vector<int>& nums, int k) {
        std::mt19937 rng(12345); // @viz loop
        int lo = 0, hi = nums.size() - 1, target = k - 1; // the answer's index if nums were sorted biggest first // @viz loop
        while (true) { // @viz loop
            int pivot = nums[lo + rng() % (hi - lo + 1)]; // a random pivot: no input can be bad every time // @viz pivot
            int lt = lo, i = lo, gt = hi; // 3 parts: [lo, lt) > pivot, [lt, i) == pivot, (gt, hi] < pivot // @viz split
            while (i <= gt) { // @viz split
                if (nums[i] > pivot) std::swap(nums[lt++], nums[i++]); // @viz split
                else if (nums[i] < pivot) std::swap(nums[i], nums[gt--]); // @viz split
                else ++i; // all copies of the pivot go together, so duplicates can't slow it down // @viz split
            }
            if (target < lt) hi = lt - 1; // the answer is among the bigger values // @viz left
            else if (target <= gt) return pivot; // the answer is the pivot itself // @viz found
            else lo = gt + 1; // it's among the smaller values // @viz right
        }
    }
};
