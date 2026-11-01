class Solution {
    public int search(int[] nums, int target) {
        int n = nums.length;
        int lo = 0, hi = n - 1; // step 1: find the smallest value, where the rotation starts // @viz pivot
        while (lo < hi) { // @viz pivot
            int mid = lo + (hi - lo) / 2; // @viz pivot
            if (nums[mid] > nums[hi]) lo = mid + 1; // the drop is to the right of mid // @viz pivot-right
            else hi = mid; // mid could be the smallest, or the drop is to its left // @viz pivot-left
        }
        int pivot = lo; // nums[pivot..] and nums[..pivot-1] are both sorted // @viz side
        if (nums[pivot] <= target && target <= nums[n - 1]) { // step 2: which sorted part could hold target? // @viz side-right, side-left
            lo = pivot; // @viz side-right
            hi = n - 1; // @viz side-right
        } else { // @viz side-left
            lo = 0; // @viz side-left
            hi = pivot - 1; // @viz side-left
        }
        while (lo <= hi) { // step 3: an ordinary binary search on that part // @viz search
            int mid = lo + (hi - lo) / 2; // @viz search
            if (nums[mid] == target) return mid; // @viz found
            if (nums[mid] < target) lo = mid + 1; // @viz higher
            else hi = mid - 1; // @viz lower
        }
        return -1; // @viz missing
    }
}
