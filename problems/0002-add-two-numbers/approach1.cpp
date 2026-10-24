/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode* head = new ListNode();
        ListNode* output = head;
        ListNode* prev = nullptr;
        int carry = 0;

        while (l1 != nullptr && l2 != nullptr) {
            int result = l1->val + l2->val + carry;
            output->val = result % 10;
            carry = result / 10;
            prev = output;
            output->next = new ListNode();
            output = output->next;
            l1 = l1->next;
            l2 = l2->next;
        }

        while (l1 != nullptr) {
            int result = l1->val + carry;
            output->val = result % 10;
            carry = result / 10;
            prev = output;
            output->next = new ListNode();
            output = output->next;
            l1 = l1->next;
        }

        while (l2 != nullptr) {
            int result = l2->val + carry;
            output->val = result % 10;
            carry = result / 10;
            prev = output;
            output->next = new ListNode();
            output = output->next;
            l2 = l2->next;
        }

        if (carry == 1) {
            output->val = 1;
            prev = output;
            output->next = new ListNode();
        }

        delete prev->next;     // free the extra trailing node
        prev->next = nullptr;
        return head;
    }
};
