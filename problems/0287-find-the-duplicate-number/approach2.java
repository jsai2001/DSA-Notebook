class Solution {
    public int findDuplicate(int[] nums) {
        int lo = 1, hi = nums.length - 1; // the duplicate is a value in 1..n // @viz init
        while (lo < hi) { // @viz guess
            int mid = (lo + hi) / 2; // @viz guess
            int count = 0; // @viz count
            for (int x : nums) if (x <= mid) count++; // how many values are <= mid? // @viz count
            if (count > mid) hi = mid; // more than mid values fit in 1..mid: a repeat is in there // @viz left
            else lo = mid + 1; // @viz right
        }
        return lo; // @viz return
    }
}
