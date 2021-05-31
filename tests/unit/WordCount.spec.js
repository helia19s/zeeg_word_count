import Vue from 'vue';
import { mount } from '@vue/test-utils';
import WordCount from '../../src/components/WordCount.vue';
import replaceAllInserter from 'string.prototype.replaceall';

import BootstrapVue from "bootstrap-vue"

Vue.use(BootstrapVue)


replaceAllInserter.shim();


describe('WordCount test', () => {
  it('should count words on button click',async () => {
    const wrapper = mount(WordCount);
    const { vm } = wrapper;
    wrapper.setData({
        text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sit adipiscing.',
    });
    const button = wrapper.find('#counwords');
    await button.trigger('click');

    expect(JSON.stringify(vm.words)).toBe('{"lorem":1,"ipsum":1,"dolor":1,"sit":2,"amet":1,"consectetuer":1,"adipiscing":2,"elit":1}');
  });

  it('should remove "Lorem" on button click in table', async  () => {
    const wrapper = mount(WordCount);
    const { vm } = wrapper;
    wrapper.setData({
        text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sit adipiscing.',
    });
    const button = wrapper.find('#counwords');
    await  button.trigger('click');
    
    const delete_button = wrapper.find("#resultbody tr:first-child .btn");
    await  delete_button.trigger('click');


    expect(JSON.stringify(wrapper.vm.words)).toBe('{"ipsum":1,"dolor":1,"sit":2,"amet":1,"consectetuer":1,"adipiscing":2,"elit":1}');
    expect(wrapper.vm.text).toBe('ipsum dolor sit amet, consectetuer adipiscing elit. Sit adipiscing.');
  });

});



describe('WordCount test utf 8', () => {
  it('should count words on button click',async () => {
    const wrapper = mount(WordCount);
    const { vm } = wrapper;
    wrapper.setData({
        text: 'لورم ایپسوم ، متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.',
    });
    const button = wrapper.find('#counwords');
    await button.trigger('click');
    expect(JSON.stringify(vm.words)).toBe('{"لورم":1,"ایپسوم":1,"متن":1,"ساختگی":1,"با":2,"تولید":1,"سادگی":1,"نامفهوم":1,"از":2,"صنعت":1,"چاپ":1,"و":1,"استفاده":1,"طراحان":1,"گرافیک":1,"است":1}');
  });

  it('should remove "لورم" on button click in table', async  () => {
    const wrapper = mount(WordCount);
    const { vm } = wrapper;
    wrapper.setData({
        text: 'لورم ایپسوم ، متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.',
    });
    const button = wrapper.find('#counwords');
    await  button.trigger('click');
    
    const delete_button = wrapper.find("#resultbody tr:first-child .btn");
    await  delete_button.trigger('click');

    expect(JSON.stringify(wrapper.vm.words)).toBe('{"ایپسوم":1,"متن":1,"ساختگی":1,"با":2,"تولید":1,"سادگی":1,"نامفهوم":1,"از":2,"صنعت":1,"چاپ":1,"و":1,"استفاده":1,"طراحان":1,"گرافیک":1,"است":1}');
    expect(wrapper.vm.text).toBe('ایپسوم ، متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.');
  });

});