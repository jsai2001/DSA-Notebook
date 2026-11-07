class Solution {
    public int findDuplicate(int[] nums) {
        int slow = 0, fast = 0; // treat i -> nums[i] as a link: index 0 starts a path that ends in a cycle // @viz init
        do { // phase 1: fast moves 2 links per step, slow 1, until they meet in the cycle // @viz meet
            slow = nums[slow]; // @viz meet
            fast = nums[nums[fast]]; // @viz meet
        } while (slow != fast); // @viz meet
        slow = 0; // phase 2: one from the start, one from the meeting point, 1 link each // @viz entry
        while (slow != fast) { // they meet where the cycle begins // @viz entry
            slow = nums[slow]; // @viz entry
            fast = nums[fast]; // @viz entry
        }
        return slow; // the cycle's entry has two links into it: that's the repeated value // @viz return
    }
}
