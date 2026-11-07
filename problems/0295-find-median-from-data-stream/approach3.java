import java.util.*;
class MedianFinder {
    private final PriorityQueue<Integer> low = new PriorityQueue<>(Collections.reverseOrder()); // the smaller half, max-heap // @viz init
    private final PriorityQueue<Integer> high = new PriorityQueue<>(); // the bigger half, min-heap // @viz init
    public MedianFinder() {}
    public void addNum(int num) {
        low.add(num); // go through low first... // @viz add
        high.add(low.poll()); // ...so low's biggest moves up: every low <= every high // @viz add
        if (high.size() > low.size()) low.add(high.poll()); // keep low the same size as high, or one bigger // @viz balance
    }
    public double findMedian() {
        if (low.size() > high.size()) return low.peek(); // odd count: the middle is low's top // @viz median
        return (low.peek() + (double) high.peek()) / 2; // even: the mean of the two tops // @viz median
    }
}
