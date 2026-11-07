import java.util.*;
class KthLargest {
    private final int k;
    private final List<Integer> nums = new ArrayList<>(); // every value seen // @viz init
    public KthLargest(int k, int[] nums) {
        this.k = k; // @viz init
        for (int x : nums) this.nums.add(x); // @viz init
    }
    public int add(int val) {
        nums.add(val); // @viz add
        nums.sort(Collections.reverseOrder()); // sort everything again, biggest first // @viz sort
        return nums.get(k - 1); // @viz answer
    }
}
