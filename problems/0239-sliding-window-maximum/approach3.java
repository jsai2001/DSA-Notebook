class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length; // @viz init
        int[] dq = new int[n]; // a deque of indexes in an array: dq[head..tail) // @viz init
        int head = 0, tail = 0; // values go down from head to tail; the head is the window's max // @viz init
        int[] res = new int[n - k + 1]; // @viz init
        for (int i = 0; i < n; i++) { // @viz step
            while (tail > head && nums[dq[tail - 1]] <= nums[i]) tail--; // smaller values behind can never be a max again // @viz pop
            dq[tail++] = i; // @viz push
            if (dq[head] <= i - k) head++; // the front slid out of the window // @viz out
            if (i >= k - 1) res[i - k + 1] = nums[dq[head]]; // @viz record
        }
        return res; // @viz return
    }
}
