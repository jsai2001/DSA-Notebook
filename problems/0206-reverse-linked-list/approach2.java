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
    public ListNode reverseList(ListNode head) {
        if (head == null || head.next == null) return head; // 0 or 1 node: already reversed // @viz base
        ListNode newHead = reverseList(head.next); // reverse everything after head // @viz call
        head.next.next = head; // head's old next is now the tail: hang head after it // @viz link
        head.next = null; // head is the new tail // @viz link
        return newHead; // the old last node, passed all the way up // @viz return
    }
}
