/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
import java.util.PriorityQueue;
class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        ListNode dummy = new ListNode(); // @viz init
        ListNode tail = dummy; // @viz init
        PriorityQueue<ListNode> heap = new PriorityQueue<>((a, b) -> Integer.compare(a.val, b.val)); // min-heap by val // @viz heads
        for (ListNode head : lists) // @viz heads
            if (head != null) heap.add(head); // one head per non-empty list // @viz heads
        while (!heap.isEmpty()) { // @viz pop
            ListNode node = heap.poll(); // the smallest of all the current heads // @viz pop
            tail.next = node; // @viz attach
            tail = node; // @viz attach
            if (node.next != null) heap.add(node.next); // the next node of the same list takes its place // @viz push
        }
        return dummy.next; // @viz return
    }
}
