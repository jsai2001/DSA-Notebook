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
        ListNode prev = null, cur = head; // prev: the reversed part so far; cur: the rest // @viz init
        while (cur != null) { // @viz loop
            ListNode next = cur.next; // save the rest before cutting the link // @viz save
            cur.next = prev; // turn this link around // @viz flip
            prev = cur; // step forward // @viz step
            cur = next; // @viz step
        }
        return prev; // the old last node // @viz return
    }
}
