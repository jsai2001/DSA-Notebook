/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public boolean hasCycle(ListNode head) {
        ListNode slow = head, fast = head; // @viz init
        while (fast != null && fast.next != null) { // fast needs two nodes ahead to take its step // @viz loop
            slow = slow.next; // one step // @viz move
            fast = fast.next.next; // two steps // @viz move
            if (slow == fast) return true; // in a cycle, fast gains one node per step and catches slow // @viz found
        }
        return false; // fast reached the end: no cycle // @viz none
    }
}
