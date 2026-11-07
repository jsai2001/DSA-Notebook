class Solution {
    public int[] twoSum(int[] numbers, int target) {
        int n = numbers.length; // @viz init
        for (int i = 0; i < n; i++) { // @viz pair
            for (int j = i + 1; j < n; j++) { // every pair i < j // @viz pair
                if (numbers[i] + numbers[j] == target) { // @viz check
                    return new int[] {i + 1, j + 1}; // the answer is 1-indexed // @viz found
                }
            }
        }
        return new int[0]; // not reached: exactly one answer exists
    }
}
