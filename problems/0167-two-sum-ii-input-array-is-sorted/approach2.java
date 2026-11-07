class Solution {
    public int[] twoSum(int[] numbers, int target) {
        int n = numbers.length; // @viz init
        for (int i = 0; i < n; i++) { // @viz pick
            int need = target - numbers[i]; // @viz pick
            int lo = i + 1, hi = n - 1; // search only AFTER i, so i isn't used twice // @viz search
            while (lo <= hi) { // @viz search
                int mid = lo + (hi - lo) / 2; // @viz search
                if (numbers[mid] == need) return new int[] {i + 1, mid + 1}; // @viz found
                if (numbers[mid] < need) lo = mid + 1; // @viz search
                else hi = mid - 1; // @viz search
            }
        }
        return new int[0]; // not reached: exactly one answer exists
    }
}
