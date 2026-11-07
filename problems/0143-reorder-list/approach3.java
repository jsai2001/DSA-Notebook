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
class Solution {
    public void reorderList(ListNode head) {
        ListNode slow = head, fast = head; // step 1: find the middle // @viz middle
        while (fast.next != null && fast.next.next != null) { // @viz middle
            slow = slow.next; // @viz middle
            fast = fast.next.next; // @viz middle
        }
        ListNode second = slow.next; // step 2: cut after the middle and reverse the second half // @viz reverse
        slow.next = null; // @viz reverse
        ListNode prev = null; // @viz reverse
        while (second != null) { // @viz reverse
            ListNode next = second.next; // @viz reverse
            second.next = prev; // @viz reverse
            prev = second; // @viz reverse
            second = next; // @viz reverse
        }
        ListNode first = head; // step 3: merge, one from each half // @viz merge
        second = prev; // @viz merge
        while (second != null) { // the second half is never longer than the first // @viz merge
            ListNode n1 = first.next; // @viz merge
            ListNode n2 = second.next; // @viz merge
            first.next = second; // @viz merge
            second.next = n1; // @viz merge
            first = n1; // @viz merge
            second = n2; // @viz merge
        }
    }
}
