import java.util.*;
class Solution {
    public int findKthLargest(int[] nums, int k) {
        Random rng = new Random(12345); // @viz loop
        int lo = 0, hi = nums.length - 1, target = k - 1; // the answer's index if nums were sorted biggest first // @viz loop
        while (true) { // @viz loop
            int pivot = nums[lo + rng.nextInt(hi - lo + 1)]; // a random pivot: no input can be bad every time // @viz pivot
            int lt = lo, i = lo, gt = hi; // 3 parts: [lo, lt) > pivot, [lt, i) == pivot, (gt, hi] < pivot // @viz split
            while (i <= gt) { // @viz split
                if (nums[i] > pivot) swap(nums, lt++, i++); // @viz split
                else if (nums[i] < pivot) swap(nums, i, gt--); // @viz split
                else i++; // all copies of the pivot go together, so duplicates can't slow it down // @viz split
            }
            if (target < lt) hi = lt - 1; // the answer is among the bigger values // @viz left
            else if (target <= gt) return pivot; // the answer is the pivot itself // @viz found
            else lo = gt + 1; // it's among the smaller values // @viz right
        }
    }
    private void swap(int[] a, int i, int j) {
        int t = a[i];
        a[i] = a[j];
        a[j] = t;
    }
}
